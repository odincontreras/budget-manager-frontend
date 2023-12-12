import { useQueryClient } from "@tanstack/react-query";

export const useQueryInvalidation = (queryKey: string) => {
  const queryClient = useQueryClient();

  const invalidateQueryHandler = () => {
    queryClient.invalidateQueries({
      queryKey: [queryKey],
    });
  };

  return { invalidateQueryHandler };
};
