import CustomerCard from "./CustomerCard";
import CustomerEditForm from "./CustomerEditForm";

const CustomerList = ({
  customers,
  editingCustomer,
  formData,
  onEditClick,
  onChange,
  onSave,
  onCancel,
}) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
      {customers.map((c) =>
        editingCustomer === c._id ? (
          <CustomerEditForm
            key={c._id}
            formData={formData}
            onChange={onChange}
            onSave={() => onSave(c._id)}
            onCancel={onCancel}
          />
        ) : (
          <CustomerCard key={c._id} customer={c} onEdit={onEditClick} />
        )
      )}
    </div>
  );
};

export default CustomerList;
