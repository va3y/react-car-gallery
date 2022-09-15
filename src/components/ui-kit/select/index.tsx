import { Listbox } from "@headlessui/react";
import cn from "classnames";

interface Option<Value> {
	disabled?: boolean;
	value: Value;
	displayValue: string;
}

interface SelectProps<V> {
	options: Option<V>[];
	value: Option<V>;
	onChange?(option: Option<V>): void;
	label?: string;
	className?: string;
}

const baseOptionStyles =
	"w-input h-input border rounded-sm border-gray flex items-center justify-between px-12 bg-white";

export function Select<V>({
	options,
	value,
	onChange,
	label,
	className,
}: SelectProps<V>) {
	return (
		<Listbox value={value} onChange={onChange}>
			<div className={cn("relative bg-white", className)}>
				{label && (
					<Listbox.Label className='text-12 mb-8 block'>{label}</Listbox.Label>
				)}
				<Listbox.Button className={cn(baseOptionStyles)}>
					{({ open }) => (
						<>
							{value.displayValue}
							<svg
								className={cn(
									"w-8 h-8 transition-transform  fill-gray",
									!open && "rotate-180"
								)}
								id='triangle'
								viewBox='0 0 100 100'>
								<polygon points='50 15, 100 100, 0 100' />
							</svg>
						</>
					)}
				</Listbox.Button>
				<Listbox.Options className='absolute mt-8 bg-white z-10'>
					{options.map((option, i) => (
						<Listbox.Option
							className={cn(baseOptionStyles, "cursor-pointer")}
							key={i}
							value={option.value}
							disabled={option.disabled}>
							{option.displayValue}
						</Listbox.Option>
					))}
				</Listbox.Options>
			</div>
		</Listbox>
	);
}
