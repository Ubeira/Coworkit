import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import headerTranslator from "../../shared/utils/headerTranslator";
import fetchAdminData from "../../shared/hooks/fetchAdminData";
import useAuth from "../../shared/hooks/useAuth";

// Creación del contexto y de su provider
export const AdminContext = React.createContext();
const AdminContextProvider = AdminContext.Provider;
export function AdminProvider({ children }) {
  // Aquí almacenaremos las peticiones a realizar y el contenido de las tablas
  const { register, handleSubmit, reset } = useForm();
  const { userData } = useAuth();
  const [headers, setHeaders] = useState([]);
  const [data, setData] = useState([]);
  const [query, setQuery] = useState("?");
  const [order, setOrder] = useState("");
  const [direction, setDirection] = useState("");
  const [renderedComponent, setRenderedComponent] = useState("");
  const [inputRowId, setInputRowId] = useState(0);
  const [submitOrigin, setSubmitOrigin] = useState("");
  const [activeAnswerReportModal, setActiveAnswerReportModal] = useState(false);
  const [fieldId, setFieldId] = useState(0);
  const [spaceEdition, setSpaceEdition] = useState(false);
  const [spaceData, setSpaceData] = useState({});

  //Aplicamos los cambios al componente correspodiente
  useEffect(() => {
    (async () => {
      setInputRowId(0);
      if (renderedComponent !== "") {
        const fetchData = await fetchAdminData(
          renderedComponent,
          query,
          order,
          direction
        );
        if (headers.length === 0) {
          setHeaders(
            headerTranslator(Object.keys(fetchData[0]), renderedComponent)
          );
        }
        //setSpaceEdition(false);
        setData(fetchData);
      }
    })();
  }, [query, order, direction, headers, renderedComponent]);

  return (
    <AdminContextProvider
      value={{
        handleSubmit,
        register,
        setQuery,
        setHeaders,
        setOrder,
        setDirection,
        setRenderedComponent,
        reset,
        setInputRowId,
        submitOrigin,
        setSubmitOrigin,
        activeAnswerReportModal,
        setActiveAnswerReportModal,
        query,
        inputRowId,
        renderedComponent,
        data,
        order,
        headers,
        userData,
        fieldId,
        setFieldId,
        spaceEdition,
        setSpaceEdition,
        spaceData,
        setSpaceData,
      }}
    >
      {children}
    </AdminContextProvider>
  );
}
