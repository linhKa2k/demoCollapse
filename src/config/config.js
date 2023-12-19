import { reactive } from "vue";

export const StatusCollapse = {
    collapseAll: 'collapseAll',
    expandAll: 'expandAll',
    activeBoth: 'activeBoth'
}

export const ListTabObj = reactive([
    {
        name: 'Tab 1',
        key: 1,
        children: [
            {
                name: 'Tab 1.1',
                key: 1.1,
                statusCollapse: StatusCollapse.expandAll,
                inActive: true
            },
            {
                name: 'Tab 1.2',
                key: 1.2,
                statusCollapse: StatusCollapse.expandAll,
                inActive: false
            }
        ]
    },
    {
        name: 'Tab 2',
        key: 2,
        children: [
            {
                name: 'Tab 2.1',
                key: 2.1,
                statusCollapse: StatusCollapse.expandAll,
                inActive: true
            },
            {
                name: 'Tab 2.2',
                key: 2.2,
                statusCollapse: StatusCollapse.expandAll,
                inActive: false
            }
        ]
    }
])