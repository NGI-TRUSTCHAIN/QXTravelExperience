import { toast } from "@/hooks/use-sonner-toast";
import { ActiveBody, StatusBody, StatusOrActiveBody } from "@/interface/generic";
import { axiosInstance } from "@/lib/api";
import { showErrorToast } from "@/lib/api-errors";


// Type guard functions
function isStatusBody(body: StatusOrActiveBody): body is StatusBody {
  return 'status' in body;
}

function isActiveBody(body: StatusOrActiveBody): body is ActiveBody {
  return 'active' in body;
}

export const changeActiveStatus = async <T>({
  apiEndpoint,
  id,
  idPlaceholder,
  body,
}: {
  apiEndpoint: string;
  id: number | string;
  idPlaceholder: string;
  body: StatusOrActiveBody;
}): Promise<T> => {
  try {
    const { data } = await axiosInstance({
      baseURL: apiEndpoint,
      isPrivate: true,
      headers: {},
    }).patch(apiEndpoint.replace(idPlaceholder, id.toString()), body);

    // Type-safe handling using type guards
    if (isActiveBody(body)) {
      toast({
        title: "Success",
        description: body.active ? "Activated successfully" : "Suspended successfully",
      });
    } else if (isStatusBody(body)) {
      toast({
        title: "Success",
        description: `Status changed to ${body.status} successfully`,
      });
    }

    return data;
  } catch (error) {
    const errorResponse = showErrorToast(error);
    throw errorResponse || error;
  }
};

export const changeItemsOrder = async <T extends { id: number; order: number }>({
  apiEndpoint,
  body,
  idPrefix
}: {
  idPrefix: string;
  apiEndpoint: string;
  body: T[];
}): Promise<T> => {
  try {
    const requestBody = body.map(item => ({
      [idPrefix]: item.id,
      order: item.order,
    }));

    const { data } = await axiosInstance({
      baseURL: apiEndpoint,
      isPrivate: true,
      headers: {},
    }).patch(apiEndpoint, requestBody);
    toast({
      title: "Success",
      description: "Order changed successfully",
    });
    return data;
  } catch (error) {
    const errorResponse = showErrorToast(error);

    throw errorResponse || error;
  }
};
