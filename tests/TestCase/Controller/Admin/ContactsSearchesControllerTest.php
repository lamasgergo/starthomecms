<?php
namespace App\Test\TestCase\Controller\Admin;

use App\Controller\Admin\ContactsSearchesController;
use Cake\TestSuite\IntegrationTestCase;

/**
 * App\Controller\Admin\ContactsSearchesController Test Case
 */
class ContactsSearchesControllerTest extends IntegrationTestCase
{

    /**
     * Fixtures
     *
     * @var array
     */
    public $fixtures = [
        'ContactsSearches' => 'app.contacts_searches',
        'Contacts' => 'app.contacts',
        'Companies' => 'app.companies',
        'InternalCompany' => 'app.internal_company',
        'Users' => 'app.users',
        'Roles' => 'app.roles',
        'ContactsUsers' => 'app.contacts_users',
        'Properties' => 'app.properties',
        'Cities' => 'app.cities',
        'Cityparts' => 'app.cityparts',
        'Districts' => 'app.districts',
        'Streets' => 'app.streets',
        'PropertiesUsers' => 'app.properties_users',
        'PropertiesContacts' => 'app.properties_contacts',
        'Rentvar' => 'app.rentvar',
        'Sellvar' => 'app.sellvar',
        'Mainimage' => 'app.mainimage',
        'Contact' => 'app.contact',
        'ContactsProperties' => 'app.contacts_properties',
        'PropertiesVariations' => 'app.properties_variations',
        'PropertiesLayouts' => 'app.properties_layouts',
        'PropertiesImages' => 'app.properties_images',
        'PropertiesDocuments' => 'app.properties_documents'
    ];

    /**
     * Test index method
     *
     * @return void
     */
    public function testIndex()
    {
        $this->markTestIncomplete('Not implemented yet.');
    }

    /**
     * Test view method
     *
     * @return void
     */
    public function testView()
    {
        $this->markTestIncomplete('Not implemented yet.');
    }

    /**
     * Test add method
     *
     * @return void
     */
    public function testAdd()
    {
        $this->markTestIncomplete('Not implemented yet.');
    }

    /**
     * Test edit method
     *
     * @return void
     */
    public function testEdit()
    {
        $this->markTestIncomplete('Not implemented yet.');
    }

    /**
     * Test delete method
     *
     * @return void
     */
    public function testDelete()
    {
        $this->markTestIncomplete('Not implemented yet.');
    }
}
