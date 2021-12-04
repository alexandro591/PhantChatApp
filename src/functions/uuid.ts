import { v4 } from 'uuid';

const uuid4 = () => {
  return v4().toString().replace(/-/g, '');
};

export { uuid4 };
