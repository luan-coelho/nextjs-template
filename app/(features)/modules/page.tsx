import db from '@/db'

export default async function ModulesPage() {
    const modules = await db.query.modules.findMany({
        with: {
            menuItems: {
                with: {
                    menuItem: true,
                },
            },
        },
    })
    return (
        <div>
            <h1>Modules</h1>
            <ul>
                {modules.map(module => (
                    <li key={module.id}>
                        <div>{module.name}</div>
                        <div>
                            <strong>Menu Items:</strong>
                            <ul>
                                {module.menuItems.map(relation => (
                                    <li key={relation.menuItem.id}>
                                        {relation.menuItem.label} - {relation.menuItem.route}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    )
}
