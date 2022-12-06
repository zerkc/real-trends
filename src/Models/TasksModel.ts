import { types, onSnapshot, applySnapshot, detach } from "mobx-state-tree";
import { autorun } from 'mobx';

const Task = types
    .model({
        id: types.identifier,
        name: types.optional(types.string, ""),
        done: types.optional(types.boolean, false),
        isEdit: types.optional(types.boolean, false),
    })
   
    .actions(self => {
        function setName(newName: string) {
            self.name = newName;
        }

        function toggle() {
            self.done = !self.done;
        }

        function enableEdit() {
            self.isEdit = true;
        }
        function disableEdit() {
            self.isEdit = false;
        }


        return { setName, toggle, enableEdit, disableEdit };
    });

const RootStore = types
    .model({
        tasks: types.optional(types.array(Task), [])
    })
    .views(self=>{
        return {
            filterTasks(filter: "ALL"| "UNCOMPLETE" = "UNCOMPLETE"){
                return self.tasks.filter(e => filter === "ALL" || !e.done)
            }
        }
    })
    .actions(self => {
        function addTask(id: string, name: string) {
            self.tasks.push(Task.create({ id, name }));
        }

        const deleteTask = (id: string) => {
            let indexTask = self.tasks.findIndex(e => e.id === id);
            detach(self.tasks[indexTask])
        }

        const moveUpTask = (id: string) => {
            let indexTask = self.tasks.findIndex(e => e.id === id);
            if (indexTask === 0) {
                return;
            }
            const taskToMove = detach(self.tasks[indexTask]);
            self.tasks.splice(indexTask - 1, 0, taskToMove);
            return;
        };

        const moveDownTask = (id: string) => {
            let indexTask = self.tasks.findIndex(e => e.id === id);
            if (indexTask >= self.tasks.length - 1) {
                return;
            }
            const taskToMove = detach(self.tasks[indexTask]);
            self.tasks.splice(indexTask + 1, 0, taskToMove);
        }


        return { addTask, deleteTask, moveUpTask, moveDownTask };
    });

export const StoreTasks = RootStore.create({
    tasks: []
});

autorun(() => {
    const snapshot = localStorage.getItem("persistData")
    if (snapshot) {

        try {
            applySnapshot(StoreTasks, JSON.parse(snapshot))
        } catch (ex) {

        }
    }
})


onSnapshot(StoreTasks, (snapshot) => {
    localStorage.setItem("persistData", JSON.stringify(snapshot));
})
