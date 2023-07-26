Feature: Roll

  Scenario: Should roll by enter with default configuration
    Given I load the TellMeAStory
    When I add new todo called "Pay rent"
    Then I should see a "pending" todo called "Pay rent"
