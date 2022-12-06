import React from 'react';
import { render, screen, } from '@testing-library/react';
import TaskItem from './TaskItem';
import { types } from 'mobx-state-tree';
import crypto from 'crypto';

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

test('renders itemList', () => {
    const task = Task.create({
        id: crypto.randomUUID(),
        name: "Item de prueba",
        done: false
    })
    render(<TaskItem deleteTask={() => { }} moveDownTask={() => { }} moveUpTask={() => { }} item={task} />);

    const linkElement = screen.getByText(/Item/i);
    expect(linkElement).toBeInTheDocument();
});
