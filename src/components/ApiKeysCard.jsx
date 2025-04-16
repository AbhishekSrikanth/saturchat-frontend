// src/components/ApiKeysCard.jsx
export default function ApiKeysCard({ form, handleChange }) {
    return (
      <div className="flex flex-col bg-white shadow-lg rounded-xl p-6 w-full max-w-sm">
        <h3 className="text-lg font-semibold mb-4 text-gray-800">API Keys</h3>
  
        <ApiKeyInput
          label="OpenAI API Key"
          name="openai_api_key"
          value={form.openai_api_key}
          onChange={handleChange}
        />
  
        <ApiKeyInput
          label="Anthropic API Key"
          name="anthropic_api_key"
          value={form.anthropic_api_key}
          onChange={handleChange}
        />
  
        <ApiKeyInput
          label="Gemini API Key"
          name="gemini_api_key"
          value={form.gemini_api_key}
          onChange={handleChange}
        />
      </div>
    );
  }
  
  function ApiKeyInput({ label, name, value, onChange }) {
    return (
      <div className="mb-4">
        <label htmlFor={name} className="block text-sm font-medium text-gray-700 mb-1">
          {label}
        </label>
        <input
          name={name}
          value={value || ''}
          onChange={onChange}
          placeholder="Add or Update API Key"
          className="w-full px-3 py-2 border rounded bg-gray-100 text-sm"
          type="text"
        />
      </div>
    );
  }
  