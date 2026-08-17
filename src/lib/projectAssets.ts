import logoDatascope from "../assets/logos/logo-datascope.jpg";
import logoCorigin from "../assets/logos/logo-corigin.jpg";
import logoJuicio from "../assets/logos/logo-juicio.jpg";
import logoHospital from "../assets/logos/logo-hospital.jpg";

import coverDatascope from "../assets/img/cover-datascope.jpg";
import coverJuicio from "../assets/img/cover-juicio.jpg";
import coverHospital from "../assets/img/cover-hospital.jpg";

export const logos: Record<string, string> = {
  datascope: logoDatascope,
  corigin: logoCorigin,
  juicio: logoJuicio,
  hospital: logoHospital,
};

export const covers: Record<string, string | undefined> = {
  datascope: coverDatascope,
  juicio: coverJuicio,
  hospital: coverHospital,
  corigin: undefined,
};
