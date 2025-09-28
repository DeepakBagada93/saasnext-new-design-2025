
import PortfolioItemDetails from './portfolio-item-details';

export default function PortfolioItemPage({ params }: { params: { id: string } }) {
  return <PortfolioItemDetails portfolioItemId={params.id} />;
}
