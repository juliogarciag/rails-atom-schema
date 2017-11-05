class RemoveProductFromOrderItems < ActiveRecord::Migration[5.1]
  def change
    remove_column :order_items, :product, :string
  end
end
