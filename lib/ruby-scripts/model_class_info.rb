file_path = ARGV[0]
match = file_path.match(/app\/models\/([\w\W]+)\.rb$/)

response = if match.present?
  model_name = match[1].classify
  {
    classFound: true,
    modelName: model_name
  }
else
  { classFound: false, modelName: nil }
end

puts response.to_json
