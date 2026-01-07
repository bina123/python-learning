// src/components/forms/DynamicForm.jsx

import { useForm, useFieldArray } from 'react-hook-form';

function DynamicForm() {
    const {
        register,
        control,
        handleSubmit,
        formState: { errors },
    } = useForm({
        defaultValues: {
            projectName: '',
            tasks: [{ name: '', priority: 'medium' }],
            team: [{ name: '', role: '' }],
        },
    });

    const {
        fields: taskFields,
        append: appendTask,
        remove: removeTask,
    } = useFieldArray({
        control,
        name: 'tasks',
    });

    const {
        fields: teamFields,
        append: appendTeam,
        remove: removeTeam,
    } = useFieldArray({
        control,
        name: 'team',
    });

    const onSubmit = (data) => {
        console.log('Form data:', data);
        alert('Form submitted! Check console.');
    };

    return (
        <div style={{ maxWidth: '800px', margin: '2rem auto' }}>
            <h1>Dynamic Form Arrays</h1>

            <div
                style={{
                    padding: '1.5rem',
                    background: '#ecf0f1',
                    borderRadius: '8px',
                    marginBottom: '2rem',
                }}
            >
                <h3>Features:</h3>
                <ul>
                    <li>✅ Add/remove fields dynamically</li>
                    <li>✅ Field arrays with useFieldArray</li>
                    <li>✅ Multiple dynamic sections</li>
                    <li>✅ Validation for each field</li>
                </ul>
            </div>

            <form
                onSubmit={handleSubmit(onSubmit)}
                style={{
                    padding: '2rem',
                    background: 'white',
                    borderRadius: '8px',
                    boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
                }}
            >
                {/* Project Name */}
                <div style={{ marginBottom: '2rem' }}>
                    <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold' }}>
                        Project Name *
                    </label>
                    <input
                        {...register('projectName', { required: 'Project name is required' })}
                        style={{
                            width: '100%',
                            padding: '0.75rem',
                            border: '2px solid #ddd',
                            borderRadius: '4px',
                        }}
                    />
                    {errors.projectName && (
                        <p style={{ color: '#e74c3c', fontSize: '0.85rem', marginTop: '0.25rem' }}>
                            {errors.projectName.message}
                        </p>
                    )}
                </div>

                {/* Tasks Section */}
                <div style={{ marginBottom: '2rem' }}>
                    <div
                        style={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            marginBottom: '1rem',
                        }}
                    >
                        <h3>Tasks</h3>
                        <button
                            type="button"
                            onClick={() => appendTask({ name: '', priority: 'medium' })}
                            style={{
                                padding: '0.5rem 1rem',
                                background: '#27ae60',
                                color: 'white',
                                border: 'none',
                                borderRadius: '4px',
                                cursor: 'pointer',
                            }}
                        >
                            + Add Task
                        </button>
                    </div>

                    {taskFields.map((field, index) => (
                        <div
                            key={field.id}
                            style={{
                                padding: '1rem',
                                background: '#f8f9fa',
                                borderRadius: '8px',
                                marginBottom: '1rem',
                            }}
                        >
                            <div style={{ display: 'flex', gap: '1rem', alignItems: 'start' }}>
                                <div style={{ flex: 2 }}>
                                    <label style={{ display: 'block', marginBottom: '0.5rem' }}>
                                        Task Name *
                                    </label>
                                    <input
                                        {...register(`tasks.${index}.name`, {
                                            required: 'Task name is required',
                                        })}
                                        style={{
                                            width: '100%',
                                            padding: '0.75rem',
                                            border: '2px solid #ddd',
                                            borderRadius: '4px',
                                        }}
                                    />
                                    {errors.tasks?.[index]?.name && (
                                        <p style={{ color: '#e74c3c', fontSize: '0.85rem', marginTop: '0.25rem' }}>
                                            {errors.tasks[index].name.message}
                                        </p>
                                    )}
                                </div>

                                <div style={{ flex: 1 }}>
                                    <label style={{ display: 'block', marginBottom: '0.5rem' }}>
                                        Priority
                                    </label>
                                    <select
                                        {...register(`tasks.${index}.priority`)}
                                        style={{
                                            width: '100%',
                                            padding: '0.75rem',
                                            border: '2px solid #ddd',
                                            borderRadius: '4px',
                                        }}
                                    >
                                        <option value="low">Low</option>
                                        <option value="medium">Medium</option>
                                        <option value="high">High</option>
                                    </select>
                                </div>

                                <button
                                    type="button"
                                    onClick={() => removeTask(index)}
                                    disabled={taskFields.length === 1}
                                    style={{
                                        marginTop: '1.75rem',
                                        padding: '0.75rem 1rem',
                                        background: taskFields.length === 1 ? '#95a5a6' : '#e74c3c',
                                        color: 'white',
                                        border: 'none',
                                        borderRadius: '4px',
                                        cursor: taskFields.length === 1 ? 'not-allowed' : 'pointer',
                                    }}
                                >
                                    Remove
                                </button>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Team Section */}
                <div style={{ marginBottom: '2rem' }}>
                    <div
                        style={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            marginBottom: '1rem',
                        }}
                    >
                        <h3>Team Members</h3>
                        <button
                            type="button"
                            onClick={() => appendTeam({ name: '', role: '' })}
                            style={{
                                padding: '0.5rem 1rem',
                                background: '#3498db',
                                color: 'white',
                                border: 'none',
                                borderRadius: '4px',
                                cursor: 'pointer',
                            }}
                        >
                            + Add Member
                        </button>
                    </div>

                    {teamFields.map((field, index) => (
                        <div
                            key={field.id}
                            style={{
                                padding: '1rem',
                                background: '#e7f3ff',
                                borderRadius: '8px',
                                marginBottom: '1rem',
                            }}
                        >
                            <div style={{ display: 'flex', gap: '1rem', alignItems: 'start' }}>
                                <div style={{ flex: 1 }}>
                                    <label style={{ display: 'block', marginBottom: '0.5rem' }}>
                                        Name *
                                    </label>
                                    <input
                                        {...register(`team.${index}.name`, {
                                            required: 'Name is required',
                                        })}
                                        style={{
                                            width: '100%',
                                            padding: '0.75rem',
                                            border: '2px solid #ddd',
                                            borderRadius: '4px',
                                        }}
                                    />
                                    {errors.team?.[index]?.name && (
                                        <p style={{ color: '#e74c3c', fontSize: '0.85rem', marginTop: '0.25rem' }}>
                                            {errors.team[index].name.message}
                                        </p>
                                    )}
                                </div>

                                <div style={{ flex: 1 }}>
                                    <label style={{ display: 'block', marginBottom: '0.5rem' }}>
                                        Role *
                                    </label>
                                    <input
                                        {...register(`team.${index}.role`, {
                                            required: 'Role is required',
                                        })}
                                        style={{
                                            width: '100%',
                                            padding: '0.75rem',
                                            border: '2px solid #ddd',
                                            borderRadius: '4px',
                                        }}
                                    />
                                    {errors.team?.[index]?.role && (
                                        <p style={{ color: '#e74c3c', fontSize: '0.85rem', marginTop: '0.25rem' }}>
                                            {errors.team[index].role.message}
                                        </p>
                                    )}
                                </div>

                                <button
                                    type="button"
                                    onClick={() => removeTeam(index)}
                                    disabled={teamFields.length === 1}
                                    style={{
                                        marginTop: '1.75rem',
                                        padding: '0.75rem 1rem',
                                        background: teamFields.length === 1 ? '#95a5a6' : '#e74c3c',
                                        color: 'white',
                                        border: 'none',
                                        borderRadius: '4px',
                                        cursor: teamFields.length === 1 ? 'not-allowed' : 'pointer',
                                    }}
                                >
                                    Remove
                                </button>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Submit */}
                <button
                    type="submit"
                    style={{
                        width: '100%',
                        padding: '1rem',
                        background: '#27ae60',
                        color: 'white',
                        border: 'none',
                        borderRadius: '4px',
                        fontSize: '1rem',
                        fontWeight: 'bold',
                        cursor: 'pointer',
                    }}
                >
                    Submit Project
                </button>
            </form>
        </div>
    );
}

export default DynamicForm;