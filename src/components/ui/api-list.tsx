interface ApiListProps {
  entityName: string;
  entityIdName: string;
}

import UseOrigin from "@/hooks/use-origin";
import React from "react";
import ApiAlert from "./ApiAlert/api-alert";

const ApiList: React.FC<ApiListProps> = ({ entityName, entityIdName }) => {
  const origin = UseOrigin();
  const baseUrl = `${origin}/api`;

  return (
    <>
      <ApiAlert
        title="GET"
        variant="public"
        description={`${baseUrl}/${entityName}`}
      />

      <ApiAlert
        title="GET"
        variant="public"
        description={`${baseUrl}/${entityName}/${entityIdName}`}
      />

      <ApiAlert
        title="POST"
        variant="admin"
        description={`${baseUrl}/${entityName}`}
      />

      <ApiAlert
        title="DELETE"
        variant="admin"
        description={`${baseUrl}/${entityName}`}
      />
    </>
  );
};

export default ApiList;
