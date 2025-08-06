/**
 * Function to retrieve daily project activities from Hubstaff.
 *
 * @param {Object} args - Arguments for the request.
 * @param {string} args.project_id - The ID of the project to retrieve activities for.
 * @param {string} [args.page_start_id] - The page start ID for pagination.
 * @param {number} [args.page_limit] - The number of activities to return per page.
 * @param {string} [args.date_start] - The start date in ISO 8601 format.
 * @param {string} [args.date_stop] - The stop date in ISO 8601 format (inclusive).
 * @param {Array<string>} [args.user_ids] - List of user IDs to filter activities.
 * @param {Array<string>} [args.task_ids] - List of task IDs to filter activities.
 * @param {string} [args.include] - Specify related data to side load.
 * @returns {Promise<Array>} - The list of daily project activities.
 */
const executeFunction = async ({ project_id, page_start_id = '', page_limit = '', date_start = '', date_stop = '', user_ids = '', task_ids = '', include = '' }) => {
  const baseUrl = 'https://api.hubstaff.com/v2/projects';
  const token = process.env.HUBSTAFF_API_API_KEY;
  try {
    // Construct the URL with query parameters
    const url = new URL(`${baseUrl}/${project_id}/activities/daily`);
    if (page_start_id) url.searchParams.append('page_start_id', page_start_id);
    if (page_limit) url.searchParams.append('page_limit', page_limit);
    if (date_start) url.searchParams.append('date[start]', date_start);
    if (date_stop) url.searchParams.append('date[stop]', date_stop);
    if (user_ids) url.searchParams.append('user_ids', user_ids);
    if (task_ids) url.searchParams.append('task_ids', task_ids);
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
    console.error('Error retrieving daily project activities:', error);
    return { error: 'An error occurred while retrieving daily project activities.' };
  }
};

/**
 * Tool configuration for retrieving daily project activities from Hubstaff.
 * @type {Object}
 */
const apiTool = {
  function: executeFunction,
  definition: {
    type: 'function',
    function: {
      name: 'retrieve_daily_project_activities',
      description: 'Retrieve daily project activities from Hubstaff.',
      parameters: {
        type: 'object',
        properties: {
          project_id: {
            type: 'string',
            description: 'The ID of the project to retrieve activities for.'
          },
          page_start_id: {
            type: 'string',
            description: 'The page start ID for pagination.'
          },
          page_limit: {
            type: 'integer',
            description: 'The number of activities to return per page.'
          },
          date_start: {
            type: 'string',
            description: 'The start date in ISO 8601 format.'
          },
          date_stop: {
            type: 'string',
            description: 'The stop date in ISO 8601 format (inclusive).'
          },
          user_ids: {
            type: 'array',
            items: {
              type: 'string'
            },
            description: 'List of user IDs to filter activities.'
          },
          task_ids: {
            type: 'array',
            items: {
              type: 'string'
            },
            description: 'List of task IDs to filter activities.'
          },
          include: {
            type: 'string',
            description: 'Specify related data to side load.'
          }
        },
        required: ['project_id']
      }
    }
  }
};

export { apiTool };