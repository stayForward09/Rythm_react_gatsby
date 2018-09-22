const { sanitize, validateEmail, validateField } = require('../src/validators');

describe('Validators', () => {
  describe('sanitize', () => {
    it('should trim a string', () => {
      // Act
      const test1 = sanitize('    aa       ');
      const test2 = sanitize('    a  a       ');
      const test3 = sanitize('    aa       !');

      // Assert
      expect(test1).toEqual('aa');
      expect(test2).toEqual('a  a');
      expect(test3).toEqual('aa       !');
    });

    it('should convert everyting to a string', () => {
      // Act
      const test1 = sanitize(12);
      const test2 = sanitize(true);
      const test3 = sanitize(function hack() {
        while (true) {}
      });

      // Assert
      expect(test1).toEqual('12');
      expect(test2).toEqual('true');
      expect(test3).toEqual(`function hack() {
        while (true) {}
      }`);
    });
  });

  describe('validateField', () => {
    it('should validate any input field', () => {
      // Assert
      expect(() => validateField()).toThrow('Invalid data');
      expect(() => validateField(undefined)).toThrow('Invalid data');
      expect(() => validateField(null)).toThrow('Invalid data');
      expect(() => validateField('')).toThrow('Invalid data');
      expect(() => validateField(0)).toThrow('Invalid data');
      expect(() => validateField('A')).toThrow('Invalid data');
      expect(() => validateField('Al')).not.toThrow();
      expect(() => validateField('Als')).not.toThrow();
    });
  });

  describe('validateEmail', () => {
    it('should deny any invalid email address', () => {
      // Assert
      expect(() => validateEmail('invalid')).toThrow('Invalid email');
      expect(() => validateEmail('invalid@s')).toThrow('Invalid email');
      expect(() => validateEmail(' @s.xs')).toThrow('Invalid email');
      expect(() => validateEmail('in @s.xs')).toThrow('Invalid email');
      expect(() => validateEmail(' in@s.xs')).toThrow('Invalid email');
      expect(() => validateEmail('invalid@s .xs')).toThrow('Invalid email');
      expect(() => validateEmail('invalid@s.xs ss')).toThrow('Invalid email');
      expect(() => validateEmail('valid@s.commmmmmm')).toThrow('Invalid email');
    });

    it('should accept any valid email address', () => {
      // Assert
      expect(() => validateEmail('valid@s.xs')).not.toThrow();
      expect(() => validateEmail('valid@s.com')).not.toThrow();
      expect(() => validateEmail('valid@s.comm')).not.toThrow();
      expect(() => validateEmail('valid@s.commm')).not.toThrow();
      expect(() => validateEmail('valid@s.london')).not.toThrow();
    });

    it('should extract the email address from a composed email string', () => {
      // Assert
      expect(() => validateEmail('MyEmail <valid@s.xs>')).not.toThrow();
      expect(() => validateEmail('My Email <valid@s.xs>')).not.toThrow();
      expect(() => validateEmail('My_Email <valid@s.xs>')).not.toThrow();

      expect(() => validateEmail('My-Email <valid@s.xs>')).toThrow(
        'Invalid email'
      );
      expect(() => validateEmail('My Email <valid@s.xs> ')).toThrow(
        'Invalid email'
      );
    });
  });
});
