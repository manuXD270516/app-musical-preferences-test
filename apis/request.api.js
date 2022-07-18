const API = "http://192.168.0.3:8080";
//const API = "http://192.168.96.196:8080";

export const getMusicalStyles = async () => {
  const res = await fetch(`${API}/musicalStyle`, {
    method: "GET"
  });
  return await res.json();
};

export const getDashboardPreferences = async () => {
  const res = await fetch(`${API}/musicalStyle/preferences`, {
    method: "GET"
  });
  return await res.json();
};

export const saveMusicalPreferenceUser = async (preference) => {
  const res = await fetch(`${API}/user/musicStyle/`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json"
    },
    body: JSON.stringify(preference)
  });
  const response = await res.json();
  return { status: res.status, response };
  //return await res.json();
};

export const saveUser = async (user) => {
  const res = await fetch(`${API}/user/`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json"
    },
    body: JSON.stringify(user)
  });
  return await res.json();
};

export const getOptionsData = async () => {
  return [
    {
      optionTitle: "ENCUESTA",
      linkNavigate: "SurveyFormScreen"
    },
    {
      optionTitle: "RESULTADOS",
      linkNavigate: "PreferencesChartScreen"
    },
    {
      optionTitle: "ACERCA DE",
      linkNavigate: "AboutScreen"
    }
  ];
};
