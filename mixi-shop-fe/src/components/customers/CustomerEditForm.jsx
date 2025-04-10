const CustomerEditForm = ({ formData, onChange, onSave, onCancel }) => (
    <div className="border rounded-2xl p-5 shadow-md bg-white">
      <input
        name="name"
        value={formData.name}
        onChange={onChange}
        className="w-full p-2 border rounded mb-2"
        placeholder="Tên"
      />
      <input
        name="email"
        value={formData.email}
        onChange={onChange}
        className="w-full p-2 border rounded mb-2"
        placeholder="Email"
      />
      <input
        name="phone"
        value={formData.phone}
        onChange={onChange}
        className="w-full p-2 border rounded mb-2"
        placeholder="SĐT"
      />
      <input
        name="address"
        value={formData.address}
        onChange={onChange}
        className="w-full p-2 border rounded mb-2"
        placeholder="Địa chỉ"
      />
      <div className="flex gap-2 mt-2">
        <button onClick={onSave} className="bg-green-500 text-white px-4 py-2 rounded-xl">
          Lưu
        </button>
        <button onClick={onCancel} className="bg-gray-300 px-4 py-2 rounded-xl">
          Hủy
        </button>
      </div>
    </div>
  );
  
  export default CustomerEditForm;
  