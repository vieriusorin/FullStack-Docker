const section = '/api';

const endpoint = {
  register: `${section}/sign-up`,
  user: {
    info: `${section}/user/info`,
  },
  auth: {
    login: `${section}/auth/login`,
    logout: `${section}/auth/logout`,
  },
  projects: {
    list: `${section}/projects`,
    single: `${section}/projects/:id`
  },
  category: `${section}/category`,
  task: `${section}/task`,
  invoice: `${section}/invoice`,
  stakeholder: `${section}/stakeholder`,
}