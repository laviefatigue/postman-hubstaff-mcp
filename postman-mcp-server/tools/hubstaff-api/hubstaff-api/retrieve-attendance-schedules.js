/**
 * Function to retrieve attendance schedules for a specific organization from Hubstaff.
 *
 * @param {Object} args - Arguments for the request.
 * @param {string} args.organization_id - The ID of the organization for which to retrieve attendance schedules.
 * @returns {Promise<Array>} - The attendance schedules for the specified organization.
 */
const executeFunction = async ({ organization_id }) => {
  const baseUrl = 'https://api.hubstaff.com';
  const token = process.env.HUBSTAFF_API_API_KEY;
  try {
    // Construct the URL with the organization ID
    const url = `${baseUrl}/v2/organizations/${organization_id}/attendance_schedules`;

    // Set up headers for the request
    const headers = {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
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
    console.error('Error retrieving attendance schedules:', error);
    return { error: 'An error occurred while retrieving attendance schedules.' };
  }
};

/**
 * Tool configuration for retrieving attendance schedules from Hubstaff.
 * @type {Object}
 */
const apiTool = {
  function: executeFunction,
  definition: {
    type: 'function',
    function: {
      name: 'retrieve_attendance_schedules',
      description: 'Retrieve attendance schedules for a specific organization from Hubstaff.',
      parameters: {
        type: 'object',
        properties: {
          organization_id: {
            type: 'string',
            description: 'The ID of the organization for which to retrieve attendance schedules.'
          }
        },
        required: ['organization_id']
      }
    }
  }
};

export { apiTool };