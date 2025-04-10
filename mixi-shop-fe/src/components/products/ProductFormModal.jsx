import { Dialog } from "@headlessui/react";

const ProductFormModal = ({
  isOpen,
  isEditing,
  form,
  onChange,
  onSubmit,
  onClose,
}) => {
  return (
    <Dialog open={isOpen} onClose={onClose} className="relative z-50">
      <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
      <div className="fixed inset-0 flex items-center justify-center p-4">
        <Dialog.Panel className="bg-white rounded-2xl p-6 w-full max-w-md shadow-xl">
          <Dialog.Title className="text-xl font-bold mb-4">
            {isEditing ? "✏️ Chỉnh sửa sản phẩm" : "➕ Thêm sản phẩm"}
          </Dialog.Title>
          <form onSubmit={onSubmit} className="space-y-3">
            <input
              name="name"
              value={form.name}
              onChange={onChange}
              placeholder="Tên sản phẩm"
              className="w-full border p-2 rounded"
              required
            />
            <textarea
              name="description"
              value={form.description}
              onChange={onChange}
              placeholder="Mô tả sản phẩm"
              rows={2}
              className="w-full border p-2 rounded"
              required
            />
            <input
              type="number"
              name="price"
              value={form.price}
              onChange={onChange}
              placeholder="Giá"
              className="w-full border p-2 rounded"
              required
            />
            <input
              type="number"
              name="stock"
              value={form.stock}
              onChange={onChange}
              placeholder="Tồn kho"
              className="w-full border p-2 rounded"
              required
            />
            <div className="flex justify-end gap-2 pt-4">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 rounded bg-gray-200 hover:bg-gray-300"
              >
                Hủy
              </button>
              <button
                type="submit"
                className="px-4 py-2 rounded bg-blue-600 text-white hover:bg-blue-700"
              >
                {isEditing ? "Lưu" : "Thêm"}
              </button>
            </div>
          </form>
        </Dialog.Panel>
      </div>
    </Dialog>
  );
};

export default ProductFormModal;
