import { Injectable } from '@angular/core';
import { HelpdeskDrawerComponent } from '@helpdesk/components/drawer/drawer.component';

@Injectable({
    providedIn: 'root'
})
export class HelpdeskDrawerService
{
    private _componentRegistry: Map<string, HelpdeskDrawerComponent> = new Map<string, HelpdeskDrawerComponent>();

    /**
     * Constructor
     */
    constructor()
    {
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * Register drawer component
     *
     * @param name
     * @param component
     */
    registerComponent(name: string, component: HelpdeskDrawerComponent): void
    {
        this._componentRegistry.set(name, component);
    }

    /**
     * Deregister drawer component
     *
     * @param name
     */
    deregisterComponent(name: string): void
    {
        this._componentRegistry.delete(name);
    }

    /**
     * Get drawer component from the registry
     *
     * @param name
     */
    getComponent(name: string): HelpdeskDrawerComponent | undefined
    {
        return this._componentRegistry.get(name);
    }
}
