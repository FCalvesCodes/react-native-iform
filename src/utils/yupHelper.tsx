import { AnyObjectSchema, ObjectSchema } from 'yup';

const isRequired = (schema: AnyObjectSchema | undefined, name: string) => {
  if (!schema) {
    return false;
  }

  return schema.fields[name]?.spec.presence === 'required';
};

const getLabel = (schema: AnyObjectSchema | undefined, name: string) => {
  if (!schema) {
    return undefined;
  }

  return schema.fields[name]?.spec.label;
};

const getDefaultValue = (field: ObjectSchema<any, any, any, any>) => {
  if (field.spec.default) {
    return field.spec.default;
  }

  if (field.spec.nullable) {
    return null;
  }

  switch (field.type) {
    case 'string':
      return '';
    case 'number':
      return 0;
    case 'boolean':
      return false;
    case 'date':
      return new Date();
    case 'array':
      return [];
    case 'object':
      return {};
    default:
      return undefined;
  }
};

const getDefaultValues = (schema: AnyObjectSchema | undefined) => {
  if (!schema) {
    return {};
  }

  return Object.keys(schema?.fields).reduce((previos, next) => {
    const defaultValue = getDefaultValue(schema?.fields[next]);

    if (defaultValue !== undefined) {
      return {
        ...previos,
        [next]: defaultValue,
      };
    }

    return previos;
  }, {});
};

export { isRequired, getLabel, getDefaultValues, getDefaultValue };
