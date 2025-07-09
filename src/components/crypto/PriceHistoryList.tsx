import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { formatCurrency } from '@/lib/formatUtils'
import { PriceHistoryItem } from '@/lib/types'

export const PriceHistoryList: React.FC<{
  priceHistory: PriceHistoryItem[]
}> = ({ priceHistory }) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Price History (24h)</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-2 max-h-64 overflow-y-auto">
          {priceHistory.map((item, index) => (
            <div
              key={index}
              className="flex justify-between items-center py-2 border-b"
            >
              <span className="text-sm text-gray-600">{item.time}</span>
              <span className="font-semibold">
                {formatCurrency(item.price)}
              </span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
