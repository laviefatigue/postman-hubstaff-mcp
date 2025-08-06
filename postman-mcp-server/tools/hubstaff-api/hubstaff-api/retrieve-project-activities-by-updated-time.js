/**
 * Function to retrieve project activities by updated time from Hubstaff.
 *
 * @param {Object} args - Arguments for retrieving project activities.
 * @param {string} args.project_id - The ID of the project to retrieve activities for.
 * @param {string} [args.updatedStart] - Start time in ISO 8601 format.
 * @param {string} [args.updatedStop] - Stop time in ISO 8601 format (exclusive).
 * @param {string} [args.pageStartId] - The page start ID for pagination.
 * @param {number} [args.pageLimit] - The number of results per page.
 * @param {string} [args.userIds] - Comma-separated list of user IDs to filter activities.
 * @param {string} [args.taskIds] - Comma-separated list of task IDs to filter activities.
 * @param {string} [args.include] - Specify related data to side load.
 * @returns {Promise<Array>} - A promise that resolves to an array of project activities.
 */
const executeFunction = async ({ project_id, updatedStart, updatedStop, pageStartId, pageLimit, userIds, taskIds, include }) => {
  const baseUrl = 'https://api.hubstaff.com/v2/projects';
  const token = process.env.HUBSTAFF_API_API_KEY;
  try {
    // Construct the URL with query parameters
    const url = new URL(`${baseUrl}/${project_id}/activities/daily/updates`);
    if (updatedStart) url.searchParams.append('updated[start]', updatedStart);
    if (updatedStop) url.searchParams.append('updated[stop]', updatedStop);
    if (pageStartId) url.searchParams.append('page_start_id', pageStartId);
    if (pageLimit) url.searchParams.append('page_limit', pageLimit.toString());
    if (userIds) url.searchParams.append('user_ids', userIds);
    if (taskIds) url.searchParams.append('task_ids', taskIds);
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
    console.error('Error retrieving project activities:', error);
    return { error: 'An error occurred while retrieving project activities.' };
  }
};

/**
 * Tool configuration for retrieving project activities from Hubstaff.
 * @type {Object}
 */
const apiTool = {
  function: executeFunction,
  definition: {
    type: 'function',
    function: {
      name: 'retrieve_project_activities',
      description: 'Retrieve project activities by updated time from Hubstaff.',
      parameters: {
        type: 'object',
        properties: {
          project_id: {
            type: 'string',
            description: 'The ID of the project to retrieve activities for.'
          },
          updatedStart: {
            type: 'string',
            description: 'Start time in ISO 8601 format.'
          },
          updatedStop: {
            type: 'string',
            description: 'Stop time in ISO 8601 format (exclusive).'
          },
          pageStartId: {
            type: 'string',
            description: 'The page start ID for pagination.'
          },
          pageLimit: {
            type: 'integer',
            description: 'The number of results per page.'
          },
          userIds: {
            type: 'string',
            description: 'Comma-separated list of user IDs to filter activities.'
          },
          taskIds: {
            type: 'string',
            description: 'Comma-separated list of task IDs to filter activities.'
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