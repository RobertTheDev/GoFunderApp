import { useState } from "react";

import { deleteCharityById } from "../../service/charity.service";

import { useParams } from "react-router-dom";

const useDeleteCharityForm = () => {
  const [message, setMessage] = useState<{
    type: string;
    content: string;
  } | null>(null);

  const { id: charityId } = useParams();

  const handledeleteCharity = async () => {
    try {
      if (charityId === undefined) {
        setMessage({ type: "error", content: "No charity id was provided." });

        return;
      }

      const deletedCharity = await deleteCharityById(charityId);

      setMessage({ type: "success", content: deletedCharity.data.message });

      return deletedCharity;
    } catch (error: any) {
      setMessage({ type: "error", content: error.response.data.message });
    }
  };

  return {
    handledeleteCharity,
    message,
  };
};

export default useDeleteCharityForm;
