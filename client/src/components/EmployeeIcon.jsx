import React from 'react'

export const EmployeeIcon = ({type, width}) => {

  switch (type) {
    case "Administrador":
    return (<img src="/administrador.png" alt="Administrador" width={width ? width : 48}/>
  );
    
    case "Fisioterapeuta":
    return (<img src="/doctor.png" alt="Fisioterapeuta" width={width ? width : 48}/>
  );

    case "Auxiliar":
    return (<img src="/auxiliar.png" alt="Auxiliar" width={width ? width : 48}/>
);
  
    default:
      return(<img src="/doctor.png" alt="Fisioterapeuta" width={width ? width : 48}/>
    );
  }
}
