#define _POSIX_C_SOURCE  200112L

#include <stdio.h>
#include <stdlib.h>
#include <sys/mman.h>

#define ALIGN 4096

int setup(int argc, char *argv[], void **out) {
    int ret = -1;

    if (argc != 2) {
        puts("Usage: test-egg <eggfile>\n");
        goto badargs;
        return -1;
    }

    FILE *f = fopen(argv[1], "rb");
    if (!f) {
        printf("Egg not exist '%s'\n", argv[1]);
        goto fopen_failed;
    }

    fseek(f, 0, SEEK_END);
    long fsize = ftell(f);
    fseek(f, 0, SEEK_SET);

    if (fsize == -1) {
        printf("Cannot determinate the size of the file '%s'\n", argv[1]);
        goto ftell_failed;
    }

    void *buf = NULL;
    if (posix_memalign(&buf, ALIGN, fsize) != 0) {
        printf("Failed to allocate '%ld' bytes aligned to %d\n", fsize, ALIGN);
        goto memalign_failed;
    }

    if (!buf) {
        printf("Buffer is NULL\n");
        goto bufnull;
    }

    if (fread(buf, 1, fsize, f) != fsize) {
        printf("Failed to read '%ld' bytes from file '%s'\n", fsize, argv[1]);
        goto fread_failed;
    }

    if (mprotect(buf, fsize, PROT_READ|PROT_WRITE|PROT_EXEC) == -1) {
        printf("Failed set rwx permissions to '%ld' bytes at %p\n", fsize, buf);
        goto mprotect_failed;
    }

    printf("Egg loaded at %p-%p\n", buf, buf+fsize);
    ret = 0;
    *out = buf;
    buf = NULL;

mprotect_failed:
fread_failed:
    free(buf);

bufnull:
memalign_failed:
ftell_failed:
    fclose(f);

fopen_failed:
badargs:
    return ret;
}

int main(int argc, char *argv[]) {
    void *buf = NULL;
    if (setup(argc, argv, &buf) != 0) {
        return -1;
    }

    // magic
    ((void(*)())buf)();

    // will never happen
    free(buf);
    return 0;
}
