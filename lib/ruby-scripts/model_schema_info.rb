model_name = ARGV.first
model_class = Kernel.const_get(model_name)

TIMESTAMPS = ["updated_at", "created_at"]

def sort_columns(columns)
  first_column = columns.find { |column| column.name === "id" }
  last_columns = columns.find_all { |column| column.name.in?(TIMESTAMPS) }
  normal_columns = columns.reject { |column| column.name.in?(TIMESTAMPS + ["id"]) }

  ([first_column] + normal_columns + last_columns).compact
end

columns = sort_columns(model_class.columns).map do |column|
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

response = {
  tableName: model_class.table_name,
  columns: columns
}

puts response.to_json
