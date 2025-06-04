import * as React from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { DayPicker } from "react-day-picker"
import { ptBR } from 'date-fns/locale';
import { cn } from "@/lib/utils"
import { buttonVariants } from "@/components/ui/button"


function Calendar({
  className,
  classNames,
  showOutsideDays = true,
  ...props
}: React.ComponentProps<typeof DayPicker>) {
   const [currentMonth, setCurrentMonth] = React.useState(new Date())

  const goToMonth = (month: Date) => {
    setCurrentMonth(month)
  }

   
  return (
   
    <DayPicker
      month={currentMonth}
      onMonthChange={setCurrentMonth}
      showOutsideDays={showOutsideDays}
      className={cn("p-3", className)}
      classNames={{
        months: "flex flex-col sm:flex-row gap-2",
        month: "flex flex-col gap-4",
        caption: "flex justify-center pt-1 relative items-center w-full",
        caption_label: "text-sm font-medium sr-only",
        nav: "flex items-center gap-1",
        nav_button: cn(
          buttonVariants({ variant: "outline" }),
          "size-7 bg-transparent p-0 opacity-50 hover:opacity-100"
        ),
        nav_button_previous: "absolute left-1",
        nav_button_next: "absolute right-1",
        table: "w-full border-collapse space-x-1",
        head_row: "flex",
        head_cell:
          "text-muted-foreground rounded-md w-8 font-normal text-[0.8rem]",
        row: "flex w-full mt-2",
        cell: cn(
          "relative p-0 text-center text-sm focus-within:relative focus-within:z-20 [&:has([aria-selected])]:bg-accent [&:has([aria-selected].day-range-end)]:rounded-r-md",
          props.mode === "range"
            ? "[&:has(>.day-range-end)]:rounded-r-md [&:has(>.day-range-start)]:rounded-l-md first:[&:has([aria-selected])]:rounded-l-md last:[&:has([aria-selected])]:rounded-r-md"
            : "[&:has([aria-selected])]:rounded-md"
        ),
        day: cn(
          buttonVariants({ variant: "ghost" }),
          "size-8 p-0 font-normal aria-selected:opacity-100"
        ),
        day_range_start:
          "day-range-start aria-selected:bg-primary aria-selected:text-primary-foreground",
        day_range_end:
          "day-range-end aria-selected:bg-primary aria-selected:text-primary-foreground",
        day_selected:
          "bg-primary text-primary-foreground hover:bg-primary hover:text-primary-foreground focus:bg-primary focus:text-primary-foreground",
        day_today: "bg-accent text-accent-foreground",
        day_outside:
          "day-outside text-muted-foreground aria-selected:text-muted-foreground",
        day_disabled: "text-muted-foreground opacity-50",
        day_range_middle:
          "aria-selected:bg-accent aria-selected:text-accent-foreground",
        day_hidden: "invisible",
        ...classNames,
      }}
      components={{
        IconLeft: ({ className, ...props }) => (
          <ChevronLeft className={cn("size-4", className)} {...props} />
        ),
        IconRight: ({ className, ...props }) => (
          <ChevronRight className={cn("size-4", className)} {...props} />
        ),
        Caption:({displayMonth, ...props}) =>{
           
           const years = Array.from({ length: 200 }, (_, i) => new Date().getFullYear() - 100 + i);
          
          // Traduzindo os nomes dos meses para português
          const months = [
            { value: 0, label: "Janeiro" }, { value: 1, label: "Fevereiro" },
            { value: 2, label: "Março" }, { value: 3, label: "Abril" },
            { value: 4, label: "Maio" }, { value: 5, label: "Junho" },
            { value: 6, label: "Julho" }, { value: 7, label: "Agosto" },
            { value: 8, label: "Setembro" }, { value: 9, label: "Outubro" },
            { value: 10, label: "Novembro" }, { value: 11, label: "Dezembro" },
          ];

          return (
            <div className="flex gap-1">
              {/* Dropdown de Mês */}
              <select
                className="rdp-dropdown_month flex-1 rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                value={displayMonth.getMonth()}
                onChange={(e) => {
                  const newMonth = new Date(displayMonth.getFullYear(), Number(e.target.value));
                  goToMonth(newMonth);
                }}
                aria-label="Selecionar Mês" // Adicionado para acessibilidade
              >
                {/* Adicionando a opção "Mês" como placeholder ou label */}
                <option value="" disabled>Mês</option> {/* <-- Adicionado */}
                {months.map((month) => (
                  <option key={month.value} value={month.value}>
                    {month.label}
                  </option>
                ))}
              </select>
              
              {/* Dropdown de Ano */}
              <select
                className="rdp-dropdown_year flex-1 rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                value={displayMonth.getFullYear()}
                onChange={(e) => {
                  const newYear = new Date(Number(e.target.value), displayMonth.getMonth());
                  goToMonth(newYear);
                }}
                aria-label="Selecionar Ano" // Adicionado para acessibilidade
              >
                {/* Adicionando a opção "Ano" como placeholder ou label */}
                <option value="" disabled>Ano</option> {/* <-- Adicionado */}
                {years.map((year) => (
                  <option key={year} value={year}>
                    {year}
                  </option>
                ))}
              </select>
            </div>
          );
        },
        
        
      }}
      captionLayout="dropdown" // Habilita os dropdowns
      fromYear={1950}          // Ano inicial para o dropdown (ajuste conforme sua necessidade)
      toYear={new Date().getFullYear() + 10} //
      locale={ptBR}
      {...props}
    />
  )
}

export { Calendar }
