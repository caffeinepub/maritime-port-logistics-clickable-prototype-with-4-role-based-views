import { useState } from 'react';
import { usePortOfTemaData } from '../../services/queries';
import { LoadingSkeleton, ErrorState, EmptyState } from '../../components/common/QueryState';
import { InfrastructureGroupedCards } from './InfrastructureGroupedCards';
import { Anchor } from 'lucide-react';

export function BerthingPage() {
  const { data: portData, isLoading, error } = usePortOfTemaData();

  if (isLoading) {
    return <LoadingSkeleton rows={6} />;
  }

  if (error) {
    return <ErrorState error={error as Error} />;
  }

  if (!portData) {
    return <EmptyState message="Port data not available" icon={Anchor} />;
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-harbor-light">Berthing Management</h1>
        <p className="text-harbor-muted">Port of Tema berthing facilities and infrastructure</p>
      </div>

      {/* Infrastructure Grouped Cards Section */}
      <InfrastructureGroupedCards data={portData.grouped_infrastructure} />
    </div>
  );
}
