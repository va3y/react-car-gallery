import { Listbox, Transition } from "@headlessui/react";
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
	"w-input h-input border rounded-sm border-gray flex items-center justify-between px-12 bg-white outline-primary";

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
			{({ open }) => (
				<div className={cn("relative bg-white ", className)}>
					{label && (
						<Listbox.Label className='text-12 mb-8 block'>
							{label}
						</Listbox.Label>
					)}
					<Listbox.Button className={cn(baseOptionStyles)}>
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
					</Listbox.Button>
					<Transition
						show={open}
						leave='transition duration-200'
						leaveFrom='opacity-100'
						leaveTo='opacity-0'>
						<Listbox.Options className='absolute mt-8 bg-white z-10 outline-primary'>
							{options.map((option, i) => (
								<Listbox.Option
									key={i}
									value={option.value}
									disabled={option.disabled}>
									{({ active, selected }) => {
										return (
											<div
												className={cn(
													baseOptionStyles,
													"cursor-pointer",
													active && "bg-primary/20"
												)}>
												{option.displayValue}
											</div>
										);
									}}
								</Listbox.Option>
							))}
						</Listbox.Options>
					</Transition>
				</div>
			)}
		</Listbox>
	);
}

export const Select = memo(_Select);
