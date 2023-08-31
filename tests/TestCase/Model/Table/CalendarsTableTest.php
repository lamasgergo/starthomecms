<?php
namespace App\Test\TestCase\Model\Table;

use App\Model\Table\CalendarsTable;
use Cake\ORM\TableRegistry;
use Cake\TestSuite\TestCase;

/**
 * App\Model\Table\CalendarsTable Test Case
 */
class CalendarsTableTest extends TestCase
{

    /**
     * Fixtures
     *
     * @var array
     */
    public $fixtures = [
        'app.calendars',
        'app.users',
        'app.roles',
        'app.properties_variations',
        'app.properties',
        'app.cities',
        'app.cityparts',
        'app.districts',
        'app.streets',
        'app.properties_users',
        'app.contacts',
        'app.companies',
        'app.internal_company',
        'app.contacts_users',
        'app.contacts_properties',
        'app.properties_contacts',
        'app.rentvar',
        'app.sellvar',
        'app.mainimage',
        'app.properties_layouts',
        'app.properties_images',
        'app.properties_documents'
    ];

    /**
     * setUp method
     *
     * @return void
     */
    public function setUp()
    {
        parent::setUp();
        $config = TableRegistry::exists('Calendars') ? [] : ['className' => 'App\Model\Table\CalendarsTable'];
        $this->Calendars = TableRegistry::get('Calendars', $config);
    }

    /**
     * tearDown method
     *
     * @return void
     */
    public function tearDown()
    {
        unset($this->Calendars);

        parent::tearDown();
    }

    /**
     * Test initialize method
     *
     * @return void
     */
    public function testInitialize()
    {
        $this->markTestIncomplete('Not implemented yet.');
    }

    /**
     * Test validationDefault method
     *
     * @return void
     */
    public function testValidationDefault()
    {
        $this->markTestIncomplete('Not implemented yet.');
    }

    /**
     * Test buildRules method
     *
     * @return void
     */
    public function testBuildRules()
    {
        $this->markTestIncomplete('Not implemented yet.');
    }
}
