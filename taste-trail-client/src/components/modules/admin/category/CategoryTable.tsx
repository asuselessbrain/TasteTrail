import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableFooter,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
const invoices = [
    {
        invoice: "INV001",
        paymentStatus: "Paid",
        totalAmount: "$250.00",
        paymentMethod: "Credit Card",
    },
    {
        invoice: "INV002",
        paymentStatus: "Pending",
        totalAmount: "$150.00",
        paymentMethod: "PayPal",
    },
    {
        invoice: "INV003",
        paymentStatus: "Unpaid",
        totalAmount: "$350.00",
        paymentMethod: "Bank Transfer",
    },
    {
        invoice: "INV004",
        paymentStatus: "Paid",
        totalAmount: "$450.00",
        paymentMethod: "Credit Card",
    },
    {
        invoice: "INV005",
        paymentStatus: "Paid",
        totalAmount: "$550.00",
        paymentMethod: "PayPal",
    },
    {
        invoice: "INV006",
        paymentStatus: "Pending",
        totalAmount: "$200.00",
        paymentMethod: "Bank Transfer",
    },
    {
        invoice: "INV007",
        paymentStatus: "Unpaid",
        totalAmount: "$300.00",
        paymentMethod: "Credit Card",
    },
]

export default function CategoryTable() {
    return (
        <div className="rounded-lg border bg-white shadow-sm my-8">
            <Table>
                    <TableHeader>
                        <TableRow className="border-b bg-gray-50 hover:bg-gray-50">
                            <TableHead className="font-semibold text-gray-700">Course Code</TableHead>
                            <TableHead className="font-semibold text-gray-700">Course Title</TableHead>
                            <TableHead className="font-semibold text-gray-700">Credits</TableHead>
                            <TableHead className="font-semibold text-gray-700">Status</TableHead>
                            <TableHead className="text-right font-semibold text-gray-700">Actions</TableHead>
                        </TableRow>
                    </TableHeader>

                <TableBody>
                    {invoices.map((invoice, i) => (
                        <TableRow
                            key={invoice.invoice}
                            className={i % 2 === 0 ? "bg-background" : "bg-muted/20"}
                        >
                            <TableCell className="font-semibold">{invoice.invoice}</TableCell>
                            <TableCell>{invoice.paymentStatus}</TableCell>
                            <TableCell className="capitalize">{invoice.paymentMethod}</TableCell>
                            <TableCell className="text-right font-medium">
                                ${invoice.totalAmount}
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    )
}
