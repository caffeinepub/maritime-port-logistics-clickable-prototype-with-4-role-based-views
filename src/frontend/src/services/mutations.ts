import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useBackendActor, QUERY_KEYS } from './backendClient';
import { toast } from 'sonner';

// Legacy mutation - no longer functional since backend was replaced
export function useUpdateAssignmentStatus() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ id, status }: { id: bigint; status: string }) => {
      // Backend no longer supports this operation
      throw new Error('Assignment updates are not available in the current system');
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.assignments });
      toast.success('Assignment status updated');
    },
    onError: (error) => {
      toast.error(`Failed to update assignment: ${error.message}`);
    },
  });
}
