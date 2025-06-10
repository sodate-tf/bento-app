import { useState } from "react";
import { IconeCalendario } from "./icons";
import { Button } from "./ui/button";
import { Calendar } from "./ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
export default function CalendarioData(){
     const [date, setDate] = useState<Date>()
return(
    <Popover>
                        <PopoverTrigger asChild>
                        <Button
                            variant={"outline"}
                            className={cn(
                            "w-[240px] justify-start text-left font-normal",
                            !date && "text-muted-foreground"
                            )}
                        >
                            {IconeCalendario}
                            {date ? format(date, "PPP") : <span>Selecione a data</span>}
                        </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                            mode="single"
                            selected={date}
                            onSelect={setDate}
                            captionLayout="dropdown-buttons"
                            initialFocus
                        />
                        </PopoverContent>
                    </Popover>
)
}