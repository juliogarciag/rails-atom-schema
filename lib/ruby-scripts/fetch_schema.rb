TIMESTAMPS = ["updated_at", "created_at"]

class ApplicationSchema
  def initialize
    Rails.application.eager_load!
    models_folder = Rails.root.join("app", "models")
    self.model_classes = ActiveRecord::Base.descendants
  end

  def as_json
    { modelSchemas: model_schemas }
  end

  private

  attr_accessor :model_classes

  def model_schemas
    model_classes.map do |model_class|
      model_schema = serialize_model_schema(model_class)
      if model_schema.present?
        [model_schema[:modelPath], model_schema]
      end
    end.compact.to_h
  end

  def serialize_model_schema(model_class)
    return if model_class.table_name.nil?
    {
      tableName: model_class.table_name,
      modelName: model_class.name,
      modelPath: model_path(model_class),
      columns: serialize_model_columns(model_class)
    }
  end

  def serialize_model_columns(model_class)
    sort_columns(model_class.columns).map do |column|
      {
        name: column.name,
        type: column.type,
        default: column.default,
        allowsNull: column.null,
        limit: column.sql_type_metadata.limit,
        precision: column.sql_type_metadata.precision,
        scale: column.sql_type_metadata.scale
      }
    end
  end

  def model_path(model_class)
    find_file_source_by_methods_lookup(model_class) ||
      find_file_source_by_guessing_name(model_class)
  end

  def find_file_source_by_methods_lookup(model_class)
    lookup_class_method_app_source(model_class) || lookup_instance_method_app_source(model_class)
  end

  def find_file_source_by_guessing_name(model_class)
    model_file_name = model_class.name.split("::").join('/').underscore.downcase + ".rb"
    candidate_file = Rails.root.join("app", "models", model_file_name)
    candidate_file if File.exist?(candidate_file)
  end

  def lookup_class_method_app_source(model_class)
    model_class.methods(false).each do |method_name|
      source_location = model_class.method(method_name).source_location
      next if source_location.nil?
      file_path, _line_number = source_location
      return file_path if file_path.starts_with?(Rails.root.to_s)
    end
    return nil
  end

  def lookup_instance_method_app_source(model_class)
    model_class.instance_methods(false).each do |method_name|
      source_location = model_class.instance_method(method_name).source_location
      next if source_location.nil?
      file_path, _line_number = source_location
      return file_path if file_path.starts_with?(Rails.root.to_s)
    end
    return nil
  end

  def sort_columns(columns)
    first_column = columns.find { |column| column.name === "id" }
    last_columns = columns.find_all { |column| column.name.in?(TIMESTAMPS) }
    normal_columns = columns.reject { |column| column.name.in?(TIMESTAMPS + ["id"]) }

    ([first_column] + normal_columns + last_columns).compact
  end
end

app_schema = ApplicationSchema.new
puts JSON.pretty_generate(app_schema.as_json)
