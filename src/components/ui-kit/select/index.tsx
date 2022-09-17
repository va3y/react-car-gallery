import { Listbox } from "@headlessui/react";
import cn from "classnames";
import { memo, useMemo } from "react";

export interface Option<V> {
	disabled?: boolean;
	value: V;
	displayValue: string;
}

interface SelectProps<V> {
	options: Option<V>[];
	value: V;
	onChange?(option: V): void;
	label?: string;
	className?: string;
	name?: string;
}

const baseOptionStyles =
	"w-input h-input border rounded-sm border-gray flex items-center justify-between px-12 bg-white";

function _Select<V>({
	options,
	value,
	onChange,
	label,
	className,
	name,
}: SelectProps<V>) {
	const optionsMap = useMemo(
		() => new Map(options.map((option) => [option.value, option.displayValue])),
		[options]
	);

	const selectedOptionDisplayValue = optionsMap.get(value);

	return (
		<Listbox value={value} onChange={onChange} name={name}>
			<div className={cn("relative bg-white", className)}>
				{label && (
					<Listbox.Label className='text-12 mb-8 block'>{label}</Listbox.Label>
				)}
				<Listbox.Button className={cn(baseOptionStyles)}>
					{({ open }) => (
						<>
							{selectedOptionDisplayValue || "None"}
							<svg
								className={cn(
									"w-8 h-8 transition-transform rotate-180 fill-gray",
									open && "rotate-0"
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

export const Select = memo(_Select);
