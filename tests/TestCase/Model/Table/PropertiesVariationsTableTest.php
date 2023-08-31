<?php
namespace App\Test\TestCase\Model\Table;

use App\Model\Table\PropertiesVariationsTable;
use Cake\ORM\TableRegistry;
use Cake\TestSuite\TestCase;

/**
 * App\Model\Table\PropertiesVariationsTable Test Case
 */
class PropertiesVariationsTableTest extends TestCase
{

    /**
     * Fixtures
     *
     * @var array
     */
    public $fixtures = [
        'app.properties_variations',
        'app.properties',
        'app.cities',
        'app.cityparts',
        'app.districts',
        'app.streets',
        'app.users',
        'app.roles',
        'app.properties_users',
        'app.contacts',
        'app.companies',
        'app.contacts_users',
        'app.properties_contacts',
        'app.rent',
        'app.sell'
    ];

    /**
     * setUp method
     *
     * @return void
     */
    public function setUp()
    {
        parent::setUp();
        $config = TableRegistry::exists('PropertiesVariations') ? [] : ['className' => 'App\Model\Table\PropertiesVariationsTable'];
        $this->PropertiesVariations = TableRegistry::get('PropertiesVariations', $config);
    }

    /**
     * tearDown method
     *
     * @return void
     */
    public function tearDown()
    {
        unset($this->PropertiesVariations);

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
