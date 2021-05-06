import useAdminContext from "../../shared/hooks/useAdminContext";

export default function SetFilterForm() {
  const { register, renderedComponent } = useAdminContext();

  //Definimos los inputs que se repiten en más de una sección
  const defaultFields = {
    user_name: (
      <input
        name="user_name"
        id="user_name"
        placeholder="Usuario"
        ref={register()}
      />
    ),
    space_name: (
      <input
        name="space_name"
        id="space_name"
        placeholder="Espacio"
        ref={register()}
      />
    ),
  };

  // Definimos los inputs correspondientes a cada sección
  const filterFormInputs = {
    users: (
      <>
        <input name="user_id" id="user_id" placeholder="ID" ref={register()} />
        <input
          name="surname"
          id="surname"
          placeholder="Apellidos"
          ref={register()}
        />
        <input name="name" id="name" placeholder="Nombre" ref={register()} />
        <div>
          <label htmlFor="registration_date">Registro</label>
          <input
            name="registration_date"
            id="registration_date"
            type="date"
            ref={register()}
          />
        </div>
        <input
          name="company"
          id="company"
          placeholder="Empresa"
          ref={register()}
        />
        <input name="admin" id="admin" placeholder="Admin" ref={register()} />
        <input
          name="verified"
          id="verified"
          placeholder="Verificado"
          ref={register()}
        />
        <input
          name="deleted"
          id="deleted"
          placeholder="Eliminado"
          ref={register()}
        />
      </>
    ),
    spaces: (
      <>
        <input
          name="space_id"
          space_id="ID"
          placeholder="ID"
          ref={register()}
        />
        <input name="type" id="type" placeholder="Tipo" ref={register()} />
        {defaultFields.space_name}
        <input name="price" id="price" placeholder="Precio" ref={register()} />
        <input
          name="capacity"
          id="capacity"
          placeholder="Aforo"
          ref={register()}
        />
        <input
          name="enabled"
          id="enabled"
          placeholder="Habilitado"
          ref={register()}
        />
      </>
    ),
    orders: (
      <>
        <input
          name="reservation_id"
          id="space_type"
          placeholder="ID"
          ref={register()}
        />

        {defaultFields.user_name}
        {defaultFields.space_name}
        <input
          name="space_type"
          id="space_type"
          placeholder="Tipo de espacio"
          ref={register()}
        />
        <input name="pack" id="pack" placeholder="Pack" ref={register()} />
        <div>
          <label htmlFor="order_date">Pedido</label>
          <input
            name="order_date"
            id="order_date"
            type="date"
            ref={register()}
          />
        </div>
        <div>
          <label htmlFor="start_date">Inicio</label>
          <input
            name="start_date"
            id="start_date"
            type="date"
            ref={register()}
          />
        </div>
        <div>
          <label htmlFor="end_date">Fin</label>
          <input name="end_date" id="end_date" type="date" ref={register()} />
        </div>
      </>
    ),
    packs: (
      <>
        <input name="pack_id" id="pack_id" placeholder="ID" ref={register()} />
        <input name="type" id="type" placeholder="Nombre" ref={register()} />
        <input name="price" id="price" placeholder="Precio" ref={register()} />
        <input
          name="enabled"
          id="enabled"
          placeholder="Habilitado"
          ref={register()}
        />
      </>
    ),
    reviews: (
      <>
        <input
          name="review_id"
          id="review_id"
          placeholder="ID"
          ref={register()}
        />

        {defaultFields.user_name}
        {defaultFields.space_name}
        <input
          name="score"
          id="score"
          placeholder="Puntuación"
          ref={register()}
        />
        <div>
          <label htmlFor="review_date">Fecha:</label>
          <input
            name="review_date"
            id="review_date"
            type="date"
            ref={register()}
          />
        </div>
      </>
    ),
    reports: (
      <>
        <input
          name="report_id"
          id="report_id"
          placeholder="ID"
          ref={register()}
        />
        <input
          name="category"
          id="category"
          placeholder="Categoría"
          ref={register()}
        />
        {defaultFields.user_name}
        {defaultFields.space_name}
        <input
          name="solved"
          id="solved"
          type="text"
          placeholder="Resuelta"
          ref={register()}
        />
        <div>
          <label htmlFor="report_date">Fecha: </label>
          <input
            name="report_date"
            id="report_date"
            type="date"
            ref={register()}
          />
        </div>
      </>
    ),
  };
  //Devolvemos los inputs que se correspondan con la sección introducida
  return filterFormInputs[renderedComponent];
}
