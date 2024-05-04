/* ========== PROPS (ARGUMENTS) TYPE ========== */
type TProps = {
    label: string;
    type: 'text' | 'email';
    placeholder?: string;
    name: string;
    value: string;
    required?: boolean;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}
/* =============================================================
 *  INPUT TEXT ELEMENT
 * ========================================================== */
export default function Input({ label, type, placeholder, required, name, value, onChange}: TProps){
    return (
      <div>
        <label htmlFor={name} className="block text-gray-700 text-sm font-bold mb-2">{label}</label>
        <input
          id={name}
          className="appearance-none border border-blue-500 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline focus:border-blue-700"
          type={type}
          name={name}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          required={required}
        />
      </div>
    );
};