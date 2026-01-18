import * as React from "react"
import { ChevronDown } from "lucide-react"
import { cn } from "@/lib/utils"

interface AccordionContextType {
  openItems: Set<string>
  toggleItem: (value: string) => void
  type: "single" | "multiple"
}

const AccordionContext = React.createContext<AccordionContextType | null>(null)

const Accordion = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & {
    type?: "single" | "multiple"
    collapsible?: boolean
    defaultValue?: string | string[]
    value?: string | string[]
    onValueChange?: (value: string | string[]) => void
  }
>(({ className, children, type = "single", defaultValue, ...props }, ref) => {
  const [openItems, setOpenItems] = React.useState<Set<string>>(() => {
    if (defaultValue) {
      return new Set(Array.isArray(defaultValue) ? defaultValue : [defaultValue])
    }
    return new Set()
  })

  const toggleItem = React.useCallback((value: string) => {
    setOpenItems(prev => {
      const newSet = new Set(prev)
      if (type === "single") {
        if (newSet.has(value)) {
          newSet.clear()
        } else {
          newSet.clear()
          newSet.add(value)
        }
      } else {
        if (newSet.has(value)) {
          newSet.delete(value)
        } else {
          newSet.add(value)
        }
      }
      return newSet
    })
  }, [type])

  const contextValue = React.useMemo(() => ({
    openItems,
    toggleItem,
    type
  }), [openItems, toggleItem, type])

  return (
    <AccordionContext.Provider value={contextValue}>
      <div ref={ref} className={cn("", className)} {...props}>
        {children}
      </div>
    </AccordionContext.Provider>
  )
})
Accordion.displayName = "Accordion"

const AccordionItem = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & {
    value: string
  }
>(({ className, children, value, ...props }, ref) => (
  <AccordionItemProvider value={value}>
    <div ref={ref} className={cn("border-b", className)} data-value={value} {...props}>
      {children}
    </div>
  </AccordionItemProvider>
))
AccordionItem.displayName = "AccordionItem"

const AccordionTrigger = React.forwardRef<
  HTMLButtonElement,
  React.ButtonHTMLAttributes<HTMLButtonElement>
>(({ className, children, ...props }, ref) => {
  const context = React.useContext(AccordionContext)
  const parent = React.useContext(AccordionItemContext)
  
  if (!context) {
    throw new Error("AccordionTrigger must be used within Accordion")
  }

  const value = parent?.value || ""
  const isOpen = context.openItems.has(value)

  return (
    <button
      ref={ref}
      className={cn(
        "flex flex-1 items-center justify-between py-4 text-left font-medium transition-all hover:underline [&[data-state=open]>svg]:rotate-180",
        className
      )}
      onClick={() => context.toggleItem(value)}
      data-state={isOpen ? "open" : "closed"}
      {...props}
    >
      {children}
      <ChevronDown className="h-4 w-4 shrink-0 transition-transform duration-200" />
    </button>
  )
})
AccordionTrigger.displayName = "AccordionTrigger"

const AccordionItemContext = React.createContext<{ value: string } | null>(null)

const AccordionItemProvider: React.FC<{ value: string, children: React.ReactNode }> = ({ value, children }) => (
  <AccordionItemContext.Provider value={{ value }}>
    {children}
  </AccordionItemContext.Provider>
)

const AccordionContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, children, ...props }, ref) => {
  const context = React.useContext(AccordionContext)
  const parent = React.useContext(AccordionItemContext)
  
  if (!context) {
    throw new Error("AccordionContent must be used within Accordion")
  }

  const value = parent?.value || ""
  const isOpen = context.openItems.has(value)

  return (
    <div
      ref={ref}
      className={cn(
        "overflow-hidden text-sm transition-all",
        isOpen ? "animate-accordion-down" : "animate-accordion-up hidden",
        className
      )}
      data-state={isOpen ? "open" : "closed"}
      {...props}
    >
      <div className="pb-4 pt-0">{children}</div>
    </div>
  )
})
AccordionContent.displayName = "AccordionContent"

export { Accordion, AccordionItem, AccordionTrigger, AccordionContent }