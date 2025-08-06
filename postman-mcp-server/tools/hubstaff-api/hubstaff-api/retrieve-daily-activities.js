/**
 * Function to retrieve daily activities from Hubstaff.
 *
 * @param {Object} args - Arguments for retrieving daily activities.
 * @param {string} args.organization_id - The ID of the organization.
 * @param {string} [args.page_start_id] - The page start ID.
 * @param {number} [args.page_limit] - The default page size.
 * @param {string} [args.date_start] - Start date in ISO 8601 format.
 * @param {string} [args.date_stop] - Stop date in ISO 8601 format (inclusive).
 * @param {string} [args.user_ids] - Comma-separated list of user IDs.
 * @param {string} [args.task_ids] - Comma-separated list of task IDs.
 * @param {string} [args.project_ids] - Comma-separated list of project IDs.
 * @param {string} [args.include] - Specify related data to side load.
 * @returns {Promise<Object>} - The result of the daily activities retrieval.
 */
const executeFunction = async ({ organization_id, page_start_id = '', page_limit = '', date_start = '', date_stop = '', user_ids = '', task_ids = '', project_ids = '', include = '' }) => {
  const baseUrl = 'https://api.hubstaff.com/v2/organizations';
  const token = process.env.HUBSTAFF_API_API_KEY;
  try {
    // Construct the URL with query parameters
    const url = new URL(`${baseUrl}/${organization_id}/activities/daily`);
    if (page_start_id) url.searchParams.append('page_start_id', page_start_id);
    if (page_limit) url.searchParams.append('page_limit', page_limit);
    if (date_start) url.searchParams.append('date[start]', date_start);
    if (date_stop) url.searchParams.append('date[stop]', date_stop);
    if (user_ids) url.searchParams.append('user_ids', user_ids);
    if (task_ids) url.searchParams.append('task_ids', task_ids);
    if (project_ids) url.searchParams.append('project_ids', project_ids);
    if (include) url.searchParams.append('include', include);

    // Set up headers for the request
    const headers = {
      'Content-Type': 'application/json'
    };

    // If a token is provided, add it to the Authorization header
    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }

    // Perform the fetch request
    const response = await fetch(url.toString(), {
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
    console.error('Error retrieving daily activities:', error);
    return { error: 'An error occurred while retrieving daily activities.' };
  }
};

/**
 * Tool configuration for retrieving daily activities from Hubstaff.
 * @type {Object}
 */
const apiTool = {
  function: executeFunction,
  definition: {
    type: 'function',
    function: {
      name: 'retrieve_daily_activities',
      description: 'Retrieve daily activities from Hubstaff.',
      parameters: {
        type: 'object',
        properties: {
          organization_id: {
            type: 'string',
            description: 'The ID of the organization.'
          },
          page_start_id: {
            type: 'string',
            description: 'The page start ID.'
          },
          page_limit: {
            type: 'number',
            description: 'The default page size.'
          },
          date_start: {
            type: 'string',
            description: 'Start date in ISO 8601 format.'
          },
          date_stop: {
            type: 'string',
            description: 'Stop date in ISO 8601 format (inclusive).'
          },
          user_ids: {
            type: 'string',
            description: 'Comma-separated list of user IDs.'
          },
          task_ids: {
            type: 'string',
            description: 'Comma-separated list of task IDs.'
          },
          project_ids: {
            type: 'string',
            description: 'Comma-separated list of project IDs.'
          },
          include: {
            type: 'string',
            description: 'Specify related data to side load.'
          }
        },
        required: ['organization_id']
      }
    }
  }
};

export { apiTool };