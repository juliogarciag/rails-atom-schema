model_name = ARGV.first
model_class = Kernel.const_get(model_name)

columns = model_class.columns.map do |column|
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
