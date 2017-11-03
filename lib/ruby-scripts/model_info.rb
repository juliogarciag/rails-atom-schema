require 'parser/current'
require 'pry'
require 'json'

file_path = ARGV[0]

def get_class_node(tree, module_names = [])
  if tree.type == :class
    [tree, module_names]
  elsif tree.type == :module
    nested_tree = tree.children.last
    module_name = tree.children.first.children.last
    get_class_node(nested_tree, module_names + [module_name])
  end
end

def concat_module_names(module_names, class_name)
  (module_names + [class_name]).join("::")
end

if File.exist?(file_path)
  tree = Parser::CurrentRuby.parse(File.read(file_path))
  class_node, module_names = get_class_node(tree)
  if class_node
    class_name_node = class_node.children.first
    class_name = class_name_node.children.last
    puts({
      fileFound: true,
      classFound: true,
      modelName: concat_module_names(module_names, class_name.to_s)
    }.to_json)
  else
    puts({ fileFound: true, classFound: false, modelName: nil }.to_json)
  end
else
  puts({ fileFound: false, classFound: false, modelName: nil }.to_json)
end
