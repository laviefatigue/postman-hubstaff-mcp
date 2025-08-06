/**
 * Function to retrieve attendance shifts for a specific organization from Hubstaff.
 *
 * @param {Object} args - Arguments for the request.
 * @param {string} args.organization_id - The ID of the organization for which to retrieve attendance shifts.
 * @returns {Promise<Array>} - The list of attendance shifts for the specified organization.
 */
const executeFunction = async ({ organization_id }) => {
  const baseUrl = 'https://api.hubstaff.com'; // Base URL for Hubstaff API
  const token = process.env.HUBSTAFF_API_API_KEY;
  try {
    // Construct the URL for the attendance shifts endpoint
    const url = `${baseUrl}/v2/organizations/${organization_id}/attendance_shifts`;

    // Set up headers for the request
    const headers = {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}` // Include Bearer token for authorization
    };

    // Perform the fetch request
    const response = await fetch(url, {
      method: 'GET',
      headers
    });

    // Check if the response was successful
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData);
    }

    // Parse and return the response data
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error retrieving attendance shifts:', error);
    return { error: 'An error occurred while retrieving attendance shifts.' };
  }
};

/**
 * Tool configuration for retrieving attendance shifts from Hubstaff.
 * @type {Object}
 */
const apiTool = {
  function: executeFunction,
  definition: {
    type: 'function',
    function: {
      name: 'retrieve_attendance_shifts',
      description: 'Retrieve attendance shifts for a specific organization from Hubstaff.',
      parameters: {
        type: 'object',
        properties: {
          organization_id: {
            type: 'string',
            description: 'The ID of the organization for which to retrieve attendance shifts.'
          }
        },
        required: ['organization_id']
      }
    }
  }
};

export { apiTool };