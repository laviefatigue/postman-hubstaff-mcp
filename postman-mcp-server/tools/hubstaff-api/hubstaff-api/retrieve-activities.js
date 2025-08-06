/**
 * Function to retrieve activities from Hubstaff for a specific organization.
 *
 * @param {Object} args - Arguments for retrieving activities.
 * @param {string} args.organization_id - The ID of the organization to retrieve activities for.
 * @param {string} [args.page_start_id] - The page start ID for pagination.
 * @param {number} [args.page_limit] - The number of activities to return per page.
 * @param {string} [args.time_slot_start] - The start time in ISO 8601 format.
 * @param {string} [args.time_slot_stop] - The stop time in ISO 8601 format (exclusive).
 * @param {string[]} [args.user_ids] - List of user IDs to filter activities.
 * @param {string[]} [args.task_ids] - List of task IDs to filter activities.
 * @param {string[]} [args.project_ids] - List of project IDs to filter activities.
 * @param {string} [args.include] - Specify related data to side load.
 * @param {string} [args.time_zone] - The time zone name for the activity.
 * @returns {Promise<Object[]>} - The list of activities for the specified organization.
 */
const executeFunction = async ({
  organization_id,
  page_start_id = '',
  page_limit = '',
  time_slot_start = '',
  time_slot_stop = '',
  user_ids = '',
  task_ids = '',
  project_ids = '',
  include = '',
  time_zone = ''
}) => {
  const baseUrl = 'https://api.hubstaff.com/v2/organizations';
  const token = process.env.HUBSTAFF_API_API_KEY;

  try {
    // Construct the URL with query parameters
    const url = new URL(`${baseUrl}/${organization_id}/activities`);
    if (page_start_id) url.searchParams.append('page_start_id', page_start_id);
    if (page_limit) url.searchParams.append('page_limit', page_limit);
    if (time_slot_start) url.searchParams.append('time_slot[start]', time_slot_start);
    if (time_slot_stop) url.searchParams.append('time_slot[stop]', time_slot_stop);
    if (user_ids) url.searchParams.append('user_ids', user_ids);
    if (task_ids) url.searchParams.append('task_ids', task_ids);
    if (project_ids) url.searchParams.append('project_ids', project_ids);
    if (include) url.searchParams.append('include', include);
    if (time_zone) url.searchParams.append('time_zone', time_zone);

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
    console.error('Error retrieving activities:', error);
    return { error: 'An error occurred while retrieving activities.' };
  }
};

/**
 * Tool configuration for retrieving activities from Hubstaff.
 * @type {Object}
 */
const apiTool = {
  function: executeFunction,
  definition: {
    type: 'function',
    function: {
      name: 'retrieve_activities',
      description: 'Retrieve activities for a specific organization from Hubstaff.',
      parameters: {
        type: 'object',
        properties: {
          organization_id: {
            type: 'string',
            description: 'The ID of the organization to retrieve activities for.'
          },
          page_start_id: {
            type: 'string',
            description: 'The page start ID for pagination.'
          },
          page_limit: {
            type: 'integer',
            description: 'The number of activities to return per page.'
          },
          time_slot_start: {
            type: 'string',
            description: 'The start time in ISO 8601 format.'
          },
          time_slot_stop: {
            type: 'string',
            description: 'The stop time in ISO 8601 format (exclusive).'
          },
          user_ids: {
            type: 'array',
            items: { type: 'string' },
            description: 'List of user IDs to filter activities.'
          },
          task_ids: {
            type: 'array',
            items: { type: 'string' },
            description: 'List of task IDs to filter activities.'
          },
          project_ids: {
            type: 'array',
            items: { type: 'string' },
            description: 'List of project IDs to filter activities.'
          },
          include: {
            type: 'string',
            description: 'Specify related data to side load.'
          },
          time_zone: {
            type: 'string',
            description: 'The time zone name for the activity.'
          }
        },
        required: ['organization_id']
      }
    }
  }
};

export { apiTool };