// my reusable component

interface  InputFieldProps {
    label: string;
    type: string;
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function InputField({
    label,
    type,
    value,
    onChange,
  }: InputFieldProps) {
    return (
        <div className="w-[560px] h-[104px] absolute top-[459px] left-[476px] gap-[18px]">
           <label className="w-[560px] h-[66px] rounded-md border p-10">
              <input 
              type={type}
               value={value}
               onChange={onChange}
               className="w-[176px] h-[18px] w-[400px] text-[14px] leading-[17.6px]"
              />
           </label>
        </div>
    )  
}