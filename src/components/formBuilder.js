import React, { useState } from 'react';
import TextInput from './TextInput';
import TextArea from './TextArea';
import Dropdown from './DropDown';
import Checkbox from './Checkbox';
import RadioButton from './RadioButton';

const fieldTypes = {
  text: TextInput,
  textarea: TextArea,
  dropdown: Dropdown,
  checkbox: Checkbox,
  radio: RadioButton
};

const FormBuilder = () => {
  const [fields, setFields] = useState([]);
  const [formValues, setFormValues] = useState({});
  const [formConfig, setFormConfig] = useState("");

  const handleAddField = () => {
    setFields([...fields, { type: '', label: '', name: '', options: [], validation: {} }]);
  };

  const handleRemoveField = (index) => {
    const newFields = [...fields];
    newFields.splice(index, 1);
    setFields(newFields);
  };

  const handleFieldChange = (index, event) => {
    const { name, value } = event.target;
    const newFields = [...fields];
  
    if (name === 'options') {
      let options = value.split(',');
      // Remove duplicates
      options = options.filter((option, i) => options.indexOf(option) === i);
      newFields[index][name] = options;
    } else {
      newFields[index][name] = value;
    }
  
    setFields(newFields);
  };
  

  const handleValidationChange = (index, event) => {
    const { name, checked } = event.target;
    const newFields = [...fields];
    newFields[index].validation[name] = checked;
    setFields(newFields);
  };

  const handleFormChange = (name, value) => {
    setFormValues({
      ...formValues,
      [name]: value
    });
  };

  const handleSaveConfig = () => {
    setFormConfig(JSON.stringify(fields));
  };

  const handleLoadConfig = () => {
    try {
      const parsedConfig = JSON.parse(formConfig);
      setFields(parsedConfig);
    } catch (error) {
      alert('Invalid JSON format');
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    for (const field of fields) {
      if (!field.type || !field.label || !field.name) {
        alert('All fields must have a type, label, and name.');
        return;
      }
      if (field.validation.required && !formValues[field.name]) {
        alert(`${field.label} is required.`);
        return;
      }
    }
    alert(`Form submitted\n${JSON.stringify(formValues, null, 2)}`);
  };

  return (
    <div className="container">
      <div className="left-section">
        <h1>Form Generator</h1>
        {fields.map((field, index) => (
          <div key={index} className="field-container">
            <select name="type" value={field.type} onChange={(e) => handleFieldChange(index, e)}>
              <option value="">Select Field Type</option>
              <option value="text">Text</option>
              <option value="textarea">Textarea</option>
              <option value="dropdown">Dropdown</option>
              <option value="checkbox">Checkbox</option>
              <option value="radio">Radio Button</option>
            </select>
            <input
              name="label"
              placeholder="Label"
              value={field.label}
              onChange={(e) => handleFieldChange(index, e)}
            />
            <input
              name="name"
              placeholder="Name"
              value={field.name}
              onChange={(e) => handleFieldChange(index, e)}
            />
            {(field.type === 'dropdown' || field.type === 'radio') && (
              <input
                name="options"
                placeholder="Comma-separated options"
                value={field.options.join(',')}
                onChange={(e) => handleFieldChange(index, e)}
              />
            )}
            <div className="validation-container">
              <label>
                Required:
                <input
                  type="checkbox"
                  name="required"
                  checked={field.validation.required || false}
                  onChange={(e) => handleValidationChange(index, e)}
                />
              </label>
            </div>
            <button onClick={() => handleRemoveField(index)}>Remove</button>
          </div>
        ))}
        <button onClick={handleAddField}>Add Field</button>
      </div>
      <div className="right-section">
        <form onSubmit={handleSubmit}>
          {fields.map((field, index) => {
            const FieldComponent = fieldTypes[field.type];
            return FieldComponent ? (
              <FieldComponent
                key={index}
                label={field.label}
                name={field.name}
                value={formValues[field.name] || ''}
                options={field.options}
                onChange={(e) => handleFormChange(field.name, e.target.value)}
              />
            ) : null;
          })}
          <button type="submit">Submit</button>
        </form>
        <hr />
        <div className='saveload'>
        <button onClick={handleSaveConfig}>Save Config</button>&nbsp;&nbsp;&nbsp;
        <button onClick={handleLoadConfig}>Load Config</button></div>
        <textarea
          className="json-config"
          value={formConfig}
          onChange={(e) => setFormConfig(e.target.value)}
          placeholder="Form configuration JSON"
        ></textarea>
      </div>
    </div>
  );
};

export default FormBuilder;
