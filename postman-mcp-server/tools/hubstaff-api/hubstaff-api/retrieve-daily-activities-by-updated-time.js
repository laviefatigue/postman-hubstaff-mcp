/**
 * Function to retrieve daily activities by updated time from Hubstaff.
 *
 * @param {Object} args - Arguments for the activity retrieval.
 * @param {string} args.organization_id - The ID of the organization.
 * @param {string} [args.updated_start] - Start time (ISO 8601).
 * @param {string} [args.updated_stop] - Stop time (ISO 8601, Exclusive).
 * @param {string} [args.page_start_id] - The page start ID.
 * @param {number} [args.page_limit] - The default page size.
 * @param {string} [args.user_ids] - List of user IDs.
 * @param {string} [args.task_ids] - List of task IDs.
 * @param {string} [args.project_ids] - List of project IDs.
 * @param {string} [args.include] - Specify related data to side load.
 * @returns {Promise<Array>} - The collection of daily activities.
 */
const executeFunction = async ({ organization_id, updated_start = '', updated_stop = '', page_start_id = '', page_limit = '', user_ids = '', task_ids = '', project_ids = '', include = '' }) => {
  const baseUrl = 'https://api.hubstaff.com/v2/organizations';
  const token = process.env.HUBSTAFF_API_API_KEY;
  try {
    // Construct the URL with query parameters
    const url = new URL(`${baseUrl}/${organization_id}/activities/daily/updates`);
    if (updated_start) url.searchParams.append('updated[start]', updated_start);
    if (updated_stop) url.searchParams.append('updated[stop]', updated_stop);
    if (page_start_id) url.searchParams.append('page_start_id', page_start_id);
    if (page_limit) url.searchParams.append('page_limit', page_limit);
    if (user_ids) url.searchParams.append('user_ids', user_ids);
    if (task_ids) url.searchParams.append('task_ids', task_ids);
    if (project_ids) url.searchParams.append('project_ids', project_ids);
    if (include) url.searchParams.append('include', include);

    // Set up headers for the request
    const headers = {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    };

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
      description: 'Retrieve daily activities by updated time from Hubstaff.',
      parameters: {
        type: 'object',
        properties: {
          organization_id: {
            type: 'string',
            description: 'The ID of the organization.'
          },
          updated_start: {
            type: 'string',
            description: 'Start time (ISO 8601).'
          },
          updated_stop: {
            type: 'string',
            description: 'Stop time (ISO 8601, Exclusive).'
          },
          page_start_id: {
            type: 'string',
            description: 'The page start ID.'
          },
          page_limit: {
            type: 'integer',
            description: 'The default page size.'
          },
          user_ids: {
            type: 'string',
            description: 'List of user IDs.'
          },
          task_ids: {
            type: 'string',
            description: 'List of task IDs.'
          },
          project_ids: {
            type: 'string',
            description: 'List of project IDs.'
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